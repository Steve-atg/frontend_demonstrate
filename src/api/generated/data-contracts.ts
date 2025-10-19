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

export type AuthResponseDto = object;

export interface CreateTransactionDto {
  /**
   * The amount of the transaction
   * @min 0.01
   * @example 29.99
   */
  amount: number;
  /**
   * Array of category IDs associated with the transaction
   * @example ["123e4567-e89b-12d3-a456-426614174001","123e4567-e89b-12d3-a456-426614174002"]
   */
  categoryIds?: string[];
  /**
   * The currency code (3 characters)
   * @minLength 3
   * @maxLength 3
   * @example "USD"
   */
  currency: string;
  /**
   * Optional description of the transaction
   * @example "Grocery shopping at Walmart"
   */
  description?: string;
  /**
   * The date when the transaction occurred
   * @example "2024-01-15T10:30:00.000Z"
   */
  transactionDate: string;
  /**
   * The type of transaction
   * @example "SPEND"
   */
  type: "SPEND" | "INCOME";
  /**
   * The ID of the user who made the transaction
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  userId: string;
}

export interface CreateUserDto {
  /**
   * URL to the user avatar image
   * @example "https://example.com/avatar.jpg"
   */
  avatar?: string;
  /**
   * The date of birth of the user
   * @format date-time
   * @example "1990-01-01T00:00:00.000Z"
   */
  dateOfBirth?: string;
  /**
   * The email address of the user
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * The gender of the user
   * @example "M"
   */
  gender?: "M" | "F" | "OTHER";
  /**
   * The password for the user account
   * @minLength 6
   * @example "securePassword123"
   */
  password: string;
  /**
   * The username of the user
   * @example "john_doe"
   */
  username: string;
}

export interface LoginDto {
  /**
   * The email address of the user
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * The password for the user account
   * @minLength 6
   * @example "securePassword123"
   */
  password: string;
}

export interface RefreshTokenDto {
  /**
   * Refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refresh_token: string;
}

export interface RefreshTokenResponseDto {
  /**
   * New access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  access_token: string;
  /**
   * New refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refresh_token: string;
}

export type RegisterDto = object;

export type TransactionResponseDto = object;

export type UpdateTransactionDto = object;

export type UpdateUserDto = object;

export interface UserResponseDto {
  /**
   * URL to the user avatar image
   * @example "https://example.com/avatar.jpg"
   */
  avatar?: string;
  /**
   * When the user was created
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * The date of birth of the user
   * @format date-time
   * @example "1990-01-01T00:00:00.000Z"
   */
  dateOfBirth?: string;
  /**
   * The email address of the user
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * The gender of the user
   * @example "M"
   */
  gender: "M" | "F" | "OTHER";
  /**
   * Unique identifier for the user
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * When the user was last updated
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  updatedAt: string;
  /**
   * The user level/rank
   * @example 1
   */
  userLevel: number;
  /**
   * The username of the user
   * @example "john_doe"
   */
  username: string;
}
