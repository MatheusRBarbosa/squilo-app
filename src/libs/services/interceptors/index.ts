import { ErrorHandlerInterceptorProvider } from './erros-handler.interceptor';
// import { JwtInterceptorProvider } from './jwt.interceptor';

export { DefaultError } from './erros-handler.interceptor';

export const InterceptorsProviders = [
  // JwtInterceptorProvider,
  ErrorHandlerInterceptorProvider,
];
