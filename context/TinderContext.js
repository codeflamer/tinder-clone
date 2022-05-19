
import { useState, createContext, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { useMoralis } from "react-moralis";


export const TinderContext = createContext();

export const TinderProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [currentAccount, setCurrentAccount] = useState();
    const [cardsData, setCardsData] = useState([]);
    const { authenticate, isAuthenticated, user ,Moralis } = useMoralis();


    useEffect(() => {
        checkWalletConnection()
    
        if (isAuthenticated) {
          requestUsersData(user.get('ethAddress'))
          requestCurrentUserData(user.get('ethAddress'))
        }
      }, [isAuthenticated])
    

    const checkWalletConnection = async () => {
        if (isAuthenticated) {
          const address = user.get('ethAddress')
          setCurrentAccount(address);
          requestToCreateUserProfile(address, faker.name.findName());
        } else {
          setCurrentAccount('');
        }
    }

    const connectWallet = async () => {
        if (!isAuthenticated) {
          try {
            await authenticate({
              signingMessage: 'Log in to out tinder clone using Moralis',
            })
          } catch (error) {
            console.error(error)
          }
        }
      }

    const disconnectWallet = async () => {
      await Moralis.User.logOut()
      setCurrentAccount('')
    }

    const requestToCreateUserProfile = async (walletAddress,name) => {
        try{
          await fetch('/api/createUser',{
              method: 'POST',
              headers: { 'Content-Type':'application/json'},
              body: JSON.stringify({
                name:name,
                userWalletAddress:walletAddress
              })
          })
          .then(response => response.json)
          .then(res => console.log(res))
        }
        catch(error) {
          console.error(error)
        }
    }

    const requestCurrentUserData = async (walletAddress) =>{
        try {
          const response  = await fetch(`/api/fetchCurrentUser?activeAccount=${walletAddress}`);
          const data = await response.json();
          setCurrentUser(data.data);
        }
        catch(error) {
          console.error(error)
        }
    }

    const requestUsersData = async (walletAddress) =>{
      try {
        const response  = await fetch(`/api/fetchUsers?activeAccount=${walletAddress}`);
        const data = await response.json();
        setCardsData(data.data);
      }
      catch(error) {
        console.error(error)
      }
    }

    const handleRightSwipe = async(cardData,currentUserAddress) =>{
      const likeData = {
        likedUser:cardData.walletAddress,
        currentUser:currentUserAddress
      }
      try{
        await fetch(`/api/saveLike`,{
          method:'POST',
          headers: {
            'content-type': 'application/json'
          },
          body:JSON.stringify(likeData)
        })

        const response = await fetch(`/api/checkMatches`,{
          method:'POST',
          headers: {
            'content-type': 'application/json'
          },
          body:JSON.stringify(likeData)
        })

        const responseData = await response.json();

        const matchStatus = responseData.data.isMatch;

        console.log(matchStatus);

        if(matchStatus){
          console.log('matches');

          const mintData = {
            walletAddresses:[cardData.walletAddress,currentUserAddress],
            names:[cardData.name,currentUser.name]
          }

          await fetch(`/api/mintMatchNft`,{
            method:'POST',
            headers: {
              'content-type': 'application/json'
            },
            body:JSON.stringify(mintData)
          })

        }


      }
      catch(error) {
        console.error(error)
      }


    }

    return (
        <TinderContext.Provider
          value={{
            cardsData,
            currentAccount,
            currentUser,
            connectWallet,
            disconnectWallet,
            handleRightSwipe
          }}
        >
          {children}
        </TinderContext.Provider>
      )
}