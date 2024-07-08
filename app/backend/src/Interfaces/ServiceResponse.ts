export type ServiceMessage = {
  message: string
};

type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' |
'NOT_FOUND' | 'CONFLICT' | 'CREATED';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: T
};

export type ServiceRole = {
  role: string
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
