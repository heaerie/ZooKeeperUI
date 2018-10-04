/**
 * ZooKeeper REST API
 * The ZooKeeper REST API provides support for the ZooKeeperUI web application. The API provides different endpoints to access and modify ZooKeeper ZNodes.  ### Authentication  All the operations of this API are authenticated. In order to start a new player session you need to invoke the `POST /sessions` operation, providing some user credentials. This operation will include an `ACCESS_TOKEN` cookie in the returned response, containing an authentication token.  This cookie must be provided in any subsequent call to the API in order to be correctly authenticated. If you are accessing this API from a web application running in a browser, the browser will already do it for you.  The returned `ACCESS_TOKEN` cookie will expire after a configurable amount of time. In order to keep your session open you have to refresh your session via the `PUT /sessions/current` operation.  A default authentication provider is included, that checks the user credentials against the `users` configuration property, which is an array of user name and password tuples. As this is a Spring Boot application, the `users` configuration property can be provided via a configuration file, environment variables, command line arguments, and Java properties.   In addition to the default authentication provider, you can provide your own, by implementing the **TODO** interface and adding your implementation to the classpath when running the application.  In order to allow users to access the API, not only have them to be authenticated, but they also need to provide the appropriate user claims. User claims grant the user permissions to perform some certain actions. Currently the only requested claim for the whole application is `ZOOKEEPER_USER`.   If you are using the default user authentication provider (based on the configuration properties), all the authenticated users will have this permission included by default. If you are using your custom authentication provider, you will have to make sure that the users have the `ZOOKEEPER_USER` claim. 
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { Http, Headers, URLSearchParams }                    from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType }                     from '@angular/http';

import { Observable }                                        from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as models                                           from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class SessionsApi {

    protected basePath = 'http://18.235.45.11';
    public defaultHeaders: Headers = new Headers();
    public configuration: Configuration = new Configuration();

    constructor(protected http: Http, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
        }
    }

    /**
     * Finishes the current session.
     * Finishes the current session. As a result, the server will remove (overwrite) the &#x60;ACCESS_TOKEN&#x60; cookie will be removed. If you are not accessing this API from a browser or any other framework that automatically manages cookies, you also have to manually remove the &#x60;ACCESS_TOKEN&#x60; cookie from your client.
     */
    public closeSession(extraHttpRequestParams?: any): Observable<{}> {
        return this.closeSessionWithHttpInfo(extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Creates a new user session, given a user name and a password.
     * Creates a new user session, given a user name and a password.  This operation returns a cookie named &#x60;ACCESS_TOKEN&#x60; in the response. This cookie must be provided in any subsequent call to the API in order to be correctly authenticated. If you are accessing this API from a web application running in a browser, the browser will already do it for you. 
     * @param userCredentials The user credentials used create a new user session.
     */
    public createNewUserSession(userCredentials: models.UserCredentials, extraHttpRequestParams?: any): Observable<models.UserSession> {
        return this.createNewUserSessionWithHttpInfo(userCredentials, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Retrieves information about the ongoing session.
     * Retrieves information about the ongoing session. This operation is useful for checking weather the session is active.
     */
    public getSessionInfo(extraHttpRequestParams?: any): Observable<models.UserSession> {
        return this.getSessionInfoWithHttpInfo(extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Refreshes the ongoing user session.
     * Refreshes the ongoing user session. This operation returns a new &#x60;ACCESS_TOKEN&#x60; cookie in the response.
     */
    public refreshSession(extraHttpRequestParams?: any): Observable<models.UserSession> {
        return this.refreshSessionWithHttpInfo(extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }


    /**
     * Finishes the current session.
     * Finishes the current session. As a result, the server will remove (overwrite) the &#x60;ACCESS_TOKEN&#x60; cookie will be removed. If you are not accessing this API from a browser or any other framework that automatically manages cookies, you also have to manually remove the &#x60;ACCESS_TOKEN&#x60; cookie from your client.
     */
    public closeSessionWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/sessions/current';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Creates a new user session, given a user name and a password.
     * Creates a new user session, given a user name and a password.  This operation returns a cookie named &#x60;ACCESS_TOKEN&#x60; in the response. This cookie must be provided in any subsequent call to the API in order to be correctly authenticated. If you are accessing this API from a web application running in a browser, the browser will already do it for you. 
     * @param userCredentials The user credentials used create a new user session.
     */
    public createNewUserSessionWithHttpInfo(userCredentials: models.UserCredentials, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/sessions';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'userCredentials' is not null or undefined
        if (userCredentials === null || userCredentials === undefined) {
            throw new Error('Required parameter userCredentials was null or undefined when calling createNewUserSession.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: userCredentials == null ? '' : JSON.stringify(userCredentials), // https://github.com/angular/angular/issues/10612
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Retrieves information about the ongoing session.
     * Retrieves information about the ongoing session. This operation is useful for checking weather the session is active.
     */
    public getSessionInfoWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/sessions/current';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Refreshes the ongoing user session.
     * Refreshes the ongoing user session. This operation returns a new &#x60;ACCESS_TOKEN&#x60; cookie in the response.
     */
    public refreshSessionWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/sessions/current';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

}
