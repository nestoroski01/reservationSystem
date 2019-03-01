import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { of } from 'rxjs/internal/observable/of';
import { GlobalService } from '../global.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('HeaderComponent', () => {
  interface ISuite {
    component: HeaderComponent,
    globalService: jasmine.SpyObj<GlobalService>,
    user: any
  }

  let suite: ISuite = <any>{};
  let GlobalServiceMock = jasmine.createSpyObj(['getUser', 'getIsLogged']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: GlobalService, useValue: GlobalServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()

    suite.component = TestBed.createComponent(HeaderComponent).componentInstance;
    suite.globalService = TestBed.get(GlobalService);
    suite.user = {
      email: "test@test",
      firstName: "Test",
      lastName: "Test",
      password: "Test",
      telephone: "1234567890",
    }

  })

  afterAll(() => {
    suite = null;
  })

  it('should be created', () => {
    expect(suite.component).toBeTruthy();
  })

  it('should call ngOnInit', () => {
    //arrange
    suite.globalService.getUser.and.returnValue(of(suite.user));

    //act
    suite.component.ngOnInit();

    //assert
    expect(suite.user).toEqual(suite.component.user);
  })

  it('should call ngOnInit, isLogged should be false and user should be undefined', () => {
    //arrange
    suite.globalService.getUser.and.returnValue(of(undefined));

    //act
    suite.component.ngOnInit();

    //assert
    expect(undefined).toEqual(suite.component.user);

  })
});
