import { MockDashboardRepository } from '@/data/repositories/mock-dashboard-repository';
import { GetDashboardUseCase } from '@/domain/usecases/get-dashboard-use-case';
import { GetGreetingUseCase } from '@/domain/usecases/get-greeting-use-case';

const dashboardRepository = new MockDashboardRepository();

export const getDashboardUseCase = new GetDashboardUseCase(dashboardRepository);
export const getGreetingUseCase = new GetGreetingUseCase();
