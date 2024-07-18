import { TestBed } from '@angular/core/testing';
import { TranslateServiceLoader } from './translate.service';

describe('TranslateService', () => {
  let service: TranslateServiceLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateServiceLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
