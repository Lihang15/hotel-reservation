import { MidwayError } from '@midwayjs/core';

/**
 * 自定义业务异常
 * @author lihang.wang
 * @date 2025-04-20
 */
export const BusinessErrorEnum = {
    NOT_FOUND: 10000,
    PASSWORD_ERROR:10001,
    EXIST: 20001,
    UNKNOWN: 30000,
    MAKE_DIR_FAILED: 40000,
    DUPLICAT_FILE:50000,
    INVALID_PATH:60000,
    CHILD_PROCESS_ERROR:70000,
}

export class BusinessError extends MidwayError {
  constructor(
    code: string | number,
    message: string,
  ) {
    super(message , <string>code)
  }
}

export const FailType = {
  LOGIN_FAILED: 'Login failed: ',
  INSERT_USER_FAIL: 'Administrator failed to add user: ',
  CREATE_PROJECT_FAIL: 'Failed to create project: ',
  REFRESH_PROJECT_FAIL: 'Failed to refresh project: ',
  CREATE_GROUP_FAIL: 'Failed to crate pattern group: ',
  SWITCH_GROUP_FAIL: 'Failed to switch pattern group: ',
}

export const FailReason = {
  INCORRECT_USER_NAME_OR_PASSWORD: 'username or password is incorrect.',
  EXIST_USER_EMAIL: "the user's email already exists.",
  NO_EXIST_USER_ROLE_NAME: "the user's role name does not exist.",
  
}
