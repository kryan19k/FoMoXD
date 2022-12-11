import React from 'react';

// SWR
import useSWR from 'swr';

export const handler = (web3: any, provider: any) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? 'web3/accounts' : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  React.useEffect(() => {
    provider &&
      provider.on('accountsChanged', (accounts: string[]) => {
        mutate(accounts[0] ?? null);
      });
  }, [mutate]);

  return {
    account: {
      data,
      mutate,
      ...rest
    }
  };
};
