import { describe, it, expect } from 'vitest';
import { apiService, ApiService } from './apiService';

describe('apiService', () => {
  it('should export apiService instance', () => {
    // Test dass der apiService korrekt exportiert ist
    expect(apiService).toBeDefined();
    expect(apiService).toBeInstanceOf(ApiService);
  });

  it('should have required methods', () => {
    // Test dass alle notwendigen Methoden vorhanden sind
    expect(typeof apiService.getPosts).toBe('function');
    expect(typeof apiService.getPost).toBe('function');
    expect(typeof apiService.getHealth).toBe('function');
  });
}); 