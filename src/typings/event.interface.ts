export interface EventInterface {
  contractAddress: string;
  checkoutProjectId: string;
  ABI: Array<Record<string, any>>;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  picture: any;
  id: any;
  chainId: string;
  slug: string;
  collectionImage: any;
  amountOfTokensToGetReward: number;
  excludedAddressesFromRewards: string[];
  rewardTitle: string;
  isCollab: boolean;
}
