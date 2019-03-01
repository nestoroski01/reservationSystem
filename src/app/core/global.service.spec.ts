import { TestBed, inject } from '@angular/core/testing';

import { GlobalService } from './global.service';

describe('GlobalService', () => {
  let user: any = {
    email: "test@test",
    firstName: "Test",
    lastName: "Test",
    password: "Test",
    telephone: "1234567890",
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalService]
    });
  });

  it('should be created', inject([GlobalService], (service: GlobalService) => {
    expect(service).toBeTruthy();
  }));

  it('should set isLogged to true', () => {
    //arrange
    let globalService = new GlobalService();

    //act
    globalService.setIsLogged(true)

    //assert
    expect(true).toEqual(globalService.getIsLogged())
  });

  it('should set user to TestUser', () => {
    //arrange
    let globalService = new GlobalService();

    //act
    globalService.setUser(user)

    //assert
    globalService.getUser().subscribe(val => {
      expect(user).toEqual(val);
    })
  });

  it('should get the user', () => {
    //arrange
    let globalService = new GlobalService();
    globalService.setUser(user)

    //act & assert
    globalService.getUser().subscribe(val => {
      expect(user).toEqual(val);
    })
  });

  it('should get isLogged', () => {
    //arrange
    let globalService = new GlobalService();
    globalService.setIsLogged(true);

    //act & assert
    expect(true).toEqual(globalService.getIsLogged());
  });

});


