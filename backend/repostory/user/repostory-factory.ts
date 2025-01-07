import { UserRepository, InMemoryUserRepository } from './user';

export function createUserRepo(): UserRepository {
    return new InMemoryUserRepository();
}