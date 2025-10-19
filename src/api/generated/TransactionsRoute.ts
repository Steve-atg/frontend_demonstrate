/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  CreateTransactionDto,
  TransactionResponseDto,
  UpdateTransactionDto,
} from "./data-contracts";

export namespace Transactions {
  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerCreate
   * @summary Create a new transaction
   * @request POST:/transactions
   * @secure
   */
  export namespace TransactionsControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateTransactionDto;
    export type RequestHeaders = {};
    export type ResponseBody = TransactionResponseDto;
  }

  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerCreateMyTransaction
   * @request POST:/transactions/me/transactions
   * @secure
   */
  export namespace TransactionsControllerCreateMyTransaction {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateTransactionDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerFindAll
   * @request GET:/transactions
   * @secure
   */
  export namespace TransactionsControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerFindOne
   * @request GET:/transactions/{id}
   * @secure
   */
  export namespace TransactionsControllerFindOne {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerGetMyTransactions
   * @request GET:/transactions/me/transactions
   * @secure
   */
  export namespace TransactionsControllerGetMyTransactions {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerRemove
   * @request DELETE:/transactions/{id}
   * @secure
   */
  export namespace TransactionsControllerRemove {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags transactions
   * @name TransactionsControllerUpdate
   * @request PATCH:/transactions/{id}
   * @secure
   */
  export namespace TransactionsControllerUpdate {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateTransactionDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}
