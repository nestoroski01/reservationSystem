import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { GlobalService } from '../../core/global.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('AuthGuard', () => {
    interface ISuite {
        globalService: jasmine.SpyObj<GlobalService>;
        router: any;
        authGuard: any;
    }

    let suite: ISuite = <any> {};
    let globalServiceMock = jasmine.createSpyObj(['getIsLogged']);
    let routerMock = jasmine.createSpyObj(['navigate']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                { provide: GlobalService, useValue: globalServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();

        suite.globalService = TestBed.get(GlobalService);
        suite.router = TestBed.get(Router);
        suite.authGuard = TestBed.get(AuthGuard);

    });

    afterAll(() => {
        suite = null;
    })

    it('should be created', () => {
        expect(suite.authGuard).toBeTruthy();
    })

    it('should call canActivate and return true', () => {
        suite.globalService.getIsLogged.and.returnValue(true);

        expect(suite.authGuard.canActivate()).toEqual(true);
    })

    it('should call canActivate, return false and navigate to /login', () => {
        suite.globalService.getIsLogged.and.returnValue(false);

        expect(suite.authGuard.canActivate()).toEqual(false);
        expect(suite.router.navigate).toHaveBeenCalledWith(['/login']);
    })



});
