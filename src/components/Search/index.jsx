import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import styles from './Search.module.scss';
import { debounce } from '~/hooks';
import * as searchService from '~/services/searchService';

function Search({ modeLight, setProfile }) {
    const [listAccounts, setListAccounts] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleAccountClick = account => {
        setProfile(account);
        setListAccounts([]);
        setValueSearch(account.login);
    };
    const handleKeyUp = useMemo(e => {
        return debounce(async e => {
            setIsLoading(false);
            const result = await searchService.searchAll(e.target.value, 5);
            setListAccounts(result);
        }, 700);
    }, []);

    async function fetchData(user) {
        const profileOctocat = await searchService.searchOne('octocat' || user);
        setProfile(profileOctocat);
    }

    const handleChange = e => {
        setIsLoading(true);
        setValueSearch(e.target.value);
        handleKeyUp(e);
    };

    return (
        <div className={clsx(styles.header__search)}>
            <input
                type="text"
                value={valueSearch}
                id={clsx(styles.searchInput)}
                placeholder="Search Github username..."
                spellCheck={false}
                onChange={handleChange}
                style={
                    modeLight
                        ? { backgroundColor: 'transparent' }
                        : { backgroundColor: 'hsl(222, 41%, 20%)' }
                }
            />

            {!isLoading && valueSearch && (
                <FontAwesomeIcon
                    icon={faXmark}
                    className={clsx(styles['header__search-remove'])}
                    onClick={() => setValueSearch('')}
                />
            )}
            {isLoading && (
                <FontAwesomeIcon
                    icon={faSpinner}
                    className={clsx(styles['header__search-loading'])}
                />
            )}

            <button
                className={clsx(styles.btnSearch)}
                onClick={() => {
                    fetchData(valueSearch);
                }}
            >
                Search
            </button>
            <div className={clsx(styles.listAccount)}>
                {listAccounts?.map(account => {
                    return (
                        <div
                            key={account.id}
                            className={clsx(styles.account__item)}
                            onClick={() => {
                                handleAccountClick(account);
                            }}
                        >
                            <img src={account.avatar_url} alt="error" />
                            <div
                                className={clsx(
                                    styles['account__item-content']
                                )}
                            >
                                <p className={clsx(styles.account__title)}>
                                    {account.name}
                                </p>
                                <p className={clsx(styles.account__login)}>
                                    @{account.login}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Search;
