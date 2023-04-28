import { TestBed } from '@angular/core/testing';

import { TypingTextModalService } from './typing-text-modal.service';

describe('TypingTextModalService', () => {
  let service: TypingTextModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypingTextModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
