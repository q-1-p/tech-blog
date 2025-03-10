import { jest } from '@jest/globals';

// グローバルなfetchのモック
type MockResponse = {
  json: () => Promise<unknown>;
  status: number;
  ok: boolean;
};

// fetchのモック実装
const mockFetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    json: () => Promise.resolve([]),
    status: 200,
    ok: true
  } as MockResponse);
});

// グローバルにfetchを設定
global.fetch = mockFetch as unknown as typeof fetch;

// 環境変数の設定
process.env.NEXT_PUBLIC_MINE_URL = 'http://localhost:3000';
