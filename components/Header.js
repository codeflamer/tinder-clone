import React from 'react'
import Image from 'next/image'
import fire from '../assets/fire.png'
import {useContext} from 'react'
import { TinderContext } from '../context/TinderContext'

const styles = {
    wrapper: `h-24 py-11 text-white flex w-screen items-center px-16 justify-between`,
    main: `flex items-center gap-4`,
    tinderText: `text-5xl font-semibold mr-8 cursor-pointer`,
    leftMenu: `flex gap-8 text-lg`,
    menuItem: `cursor-pointer hover:text-red-400 duration-300 hover:scale-110`,
    rightMenu: `flex gap-3 items-center`,
    currentAccount: `px-2 py-1 border border-gray-500 rounded-full flex items-center`,
    accountAddress: `ml-2`,
    authButton: `bg-white font-bold text-red-500 px-6 py-3 items-center ml-4 rounded-lg hover:bg-red-500 duration-300 hover:text-white`,
  }

  const currentAccount ='0x65512323D9FBC19aE98b832f5259ad62a13F7c15';

const Header = () => {

    const {connectWallet,currentAccount,disconnectWallet} = useContext(TinderContext)

  return (
    <div className={`${styles.wrapper} ${
        currentAccount ? 'bg-gray-900' : 'bg-transparent fixed'
      }`}>
        <div className={styles.main}>
            <Image src={fire} alt='fire' height={45} width={45} />
            <h1 className={styles.tinderText}>Tinder</h1>
            <div className={styles.leftMenu}>
                <div className={styles.menuItem}>Products</div>
                <div className={styles.menuItem}>Learn</div>
                {/* <div className={styles.menuItem}>Safety</div>
                <div className={styles.menuItem}>Support</div>
                <div className={styles.menuItem}>Download</div> */}
            </div>

            <div className={styles.rightMenu}>
                <div>Engish</div>
               
                {currentAccount ? (
          <>
            <div className={styles.currentAccount}>
              {/* <Image
                src={
                  'https://moralis.io/wp-content/uploads/2021/05/moralisWhiteLogo.svg'
                }
                alt='moralis'
                height={20}
                width={20}
              /> */}
              <span className={styles.accountAddress}>
                {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
              </span>
            </div>
            <button
                className={styles.authButton}
                onClick={() => disconnectWallet()}
                >
                Logout
            </button>
          </>
            ) : (
            <button className={styles.authButton} onClick={() => connectWallet()}>
                Login
            </button>
            )}
            </div>
        </div>
    </div>
  )
}

export default Header