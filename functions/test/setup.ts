import { vi } from 'vitest';

vi.mock('firebase-admin/app', () => ({
  initializeApp: vi.fn().mockImplementation(() => ({
    credential: vi.fn()
  })),
  cert: vi.fn()
}));

vi.mock('firebase-admin/firestore', () => ({
  getFirestore: vi.fn().mockImplementation(() => ({
    collection: vi.fn().mockReturnThis(),
    doc: vi.fn().mockReturnThis(),
    get: vi.fn().mockResolvedValue({}),
    add: vi.fn().mockResolvedValue({}),
    set: vi.fn().mockResolvedValue({})
  }))
}));
