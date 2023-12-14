export interface PageTokensState {
  pageTokens: { prevPageToken: string | null, nextPageToken: string | null }
}

export const initialState: PageTokensState = {
  pageTokens: { prevPageToken: null, nextPageToken: null }
};
