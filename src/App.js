import clsx from 'clsx';
import { useEffect, useState } from 'react';

import styles from './App.module.scss';
import iconLight from './assets/icon-sun.svg';
import iconDark from './assets/icon-moon.svg';
import locationImg from './assets/icon-location.svg';
import twitterImg from './assets/icon-twitter.svg';
import websiteImg from './assets/icon-website.svg';
import companyImg from './assets/icon-company.svg';
import { Search } from './components';
import * as searchService from '~/services/searchService';

function App() {
    const [modeLight, setModeLight] = useState(true);
    const [profile, setProfile] = useState(null);
    const handleClickMode = () => {
        setModeLight(prev => !prev);
    };
    async function fetchData(user) {

        const profileOctocat = await searchService.searchOne('octocat' || user);
        setProfile(profileOctocat);
    }
    useEffect(() => {
        fetchData(); // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (!modeLight) {
            document.documentElement.style.setProperty(
                '--contentColor',
                'white'
            );
            document.documentElement.style.setProperty('--titleColor', 'white');
            document.documentElement.style.setProperty(
                '--bgColor',
                'gainsboro'
            );
        } else {
            document.documentElement.style.setProperty(
                '--contentColor',
                'hsl(218, 35%, 45%)'
            );
            document.documentElement.style.setProperty(
                '--titleColor',
                'hsl(217, 21%, 21%)'
            );
            document.documentElement.style.setProperty('--bgColor', 'white');
        }
    }, [modeLight]);
    return (
        <div
            className={clsx(styles.wrapper)}
            style={
                modeLight
                    ? {
                          boxShadow: ' none',
                          backgroundColor: 'transparent',
                      }
                    : {
                          boxShadow: ' 0 0 0 1000px hsl(220, 40%, 13%)',
                          backgroundColor: 'hsl(220, 40%, 13%)',
                      }
            }
        >
            <div className={clsx(styles.header)}>
                <div className={clsx(styles.header__content)}>
                    <p className={clsx(styles['header__content-title'])}>
                        devfinder
                    </p>
                    <div
                        className={clsx(styles['header__content-mode'])}
                        onClick={handleClickMode}
                    >
                        <p className={clsx(styles['mode-title'])}>
                            {modeLight ? 'DARK' : 'LIGHT'}
                        </p>
                        <img
                            src={modeLight ? iconDark : iconLight}
                            alt="Error"
                            width={'20px'}
                            height={'20px'}
                        />
                    </div>
                </div>
                <Search modeLight={modeLight} setProfile={setProfile} />
            </div>
            <div
                className={clsx(styles.container)}
                style={
                    modeLight
                        ? { backgroundColor: 'white' }
                        : { backgroundColor: 'hsl(222, 41%, 20%)' }
                }
            >
                <img
                    src={
                        profile
                            ? profile.avatar_url
                            : require('~/assets/octocat.png')
                    }
                    alt="No avatar"
                    className={clsx(styles.avatar)}
                />
                <div className={clsx(styles.detail)}>
                    <div className={clsx(styles.detail__name)}>
                        <div className={clsx(styles.name)}>
                            <p className={clsx(styles.fullName)}>
                                {profile
                                    ? profile.name
                                        ? profile.name
                                        : 'Null'
                                    : 'Null'}
                            </p>
                            <p className={clsx(styles.login)}>
                                @
                                {profile
                                    ? profile.login
                                        ? profile.login
                                        : 'Null'
                                    : 'Null'}
                            </p>
                        </div>
                        <p className={clsx(styles.createAt)}>
                            {profile
                                ? profile.created_at
                                    ? new Date(
                                          profile.created_at
                                      ).toDateString()
                                    : 'Null'
                                : 'Null'}
                        </p>
                    </div>
                    <div className={clsx(styles.detail__bio)}>
                        {profile
                            ? profile.bio
                                ? profile.bio
                                : 'This profile has no bio'
                            : 'Null'}
                    </div>
                    <div
                        className={clsx(styles.detail__summary)}
                        style={
                            modeLight
                                ? { backgroundColor: 'transparent' }
                                : { backgroundColor: 'hsl(220, 40%, 13%)' }
                        }
                    >
                        <div className={clsx(styles.summary__item)}>
                            <p className={clsx(styles['summary__item-title'])}>
                                Repos
                            </p>
                            <p
                                className={clsx(
                                    styles['summary__item-quantity']
                                )}
                            >
                                {profile
                                    ? profile.public_repos
                                        ? profile.public_repos
                                        : 0
                                    : 'Null'}
                            </p>
                        </div>
                        <div className={clsx(styles.summary__item)}>
                            <p className={clsx(styles['summary__item-title'])}>
                                Followers
                            </p>
                            <p
                                className={clsx(
                                    styles['summary__item-quantity']
                                )}
                            >
                                {profile
                                    ? profile.followers
                                        ? profile.followers
                                        : 0
                                    : 'Null'}
                            </p>
                        </div>
                        <div className={clsx(styles.summary__item)}>
                            <p className={clsx(styles['summary__item-title'])}>
                                Following
                            </p>
                            <p
                                className={clsx(
                                    styles['summary__item-quantity']
                                )}
                            >
                                {profile
                                    ? profile.following
                                        ? profile.following
                                        : 0
                                    : 'Null'}
                            </p>
                        </div>
                    </div>
                    <div
                        className={clsx(styles.detail__contact)}
                        style={
                            modeLight
                                ? { filter: 'brightness(100%)' }
                                : { filter: 'brightness(1000%)' }
                        }
                    >
                        <div className={clsx(styles.contact__item)}>
                            <img src={locationImg} alt="Error" />
                            <p className={clsx(styles['contact__item-title'])}>
                                {profile
                                    ? profile.location
                                        ? profile.location
                                        : 'Not available'
                                    : 'Null'}
                            </p>
                        </div>
                        <div className={clsx(styles.contact__item)}>
                            <img src={twitterImg} alt="Error" />
                            <p
                                className={clsx(
                                    styles['contact__item-title'],
                                    'actives'
                                )}
                            >
                                {profile
                                    ? profile.twitter_username
                                        ? profile.twitter_username
                                        : 'Not available'
                                    : 'Null'}
                            </p>
                        </div>
                        <div className={clsx(styles.contact__item)}>
                            <img src={websiteImg} alt="Error" />
                            <p className={clsx(styles['contact__item-title'])}>
                                {profile
                                    ? profile.blog
                                        ? profile.blog
                                        : 'Not available'
                                    : 'Null'}
                            </p>
                        </div>
                        <div className={clsx(styles.contact__item)}>
                            <img src={companyImg} alt="Error" />
                            <p className={clsx(styles['contact__item-title'])}>
                                {profile
                                    ? profile.company
                                        ? profile.company
                                        : 'Not available'
                                    : 'Null'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
