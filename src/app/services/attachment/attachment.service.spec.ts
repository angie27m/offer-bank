import { AttachmentService } from './attachment.service';
import { TestBed } from '@angular/core/testing';

describe('AttachmentService', () => {
  let service: AttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
