
import { useState, createContext, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { useMoralis } from "react-moralis";


export const TinderContext = createContext();

export const TinderProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [currentAccount, setCurrentAccount] = useState();
    const [cardsData, setCardsData] = useState([]);
    const { authenticate, isAuthenticated, user } = useMoralis();


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
          setCurrentAccount(address)
          requestToCreateUserProfile(address, faker.name.findName())
        } else {
          setCurrentAccount('')
        }
    }

    const connectWallet = async () => {
        if (!isAuthenticated) {
          try {
            await authenticate({
              signingMessage: 'Log in using Moralis',
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
    return (
        <TinderContext.Provider
          value={{
            cardsData,
            currentAccount,
            currentUser,
            connectWallet,
            disconnectWallet
          }}
        >
          {children}
        </TinderContext.Provider>
      )
}