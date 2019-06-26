export interface StrapiEventContract {
    id: number;
    abi: any[];
    approver: {id: number};
    minter: {id: number};
    marketer: {id: number};
    binary: string;
    name: string;
    runtime_binary: string;
    solidity_version: string;
    sources: string;
    t721_version: string;
}
