import { MockDashboardRepository } from '@/features/dashboard/data/repositories/mock-dashboard-repository';
import { DashboardService } from '@/features/dashboard/data/services/dashboard-service';
import { GetDashboardUseCase } from '@/features/dashboard/domain/usecases/get-dashboard-use-case';
import { GetGreetingUseCase } from '@/features/dashboard/domain/usecases/get-greeting-use-case';
import { AddTransactionUseCase } from '@/features/add-transaction/domain/usecases/add-transaction-use-case';
import { InsightsService } from '@/features/insights/data/services/insights-service';
import { AccountsService } from '@/features/profile/data/services/accounts-service';
import { ProfileService } from '@/features/profile/data/services/profile-service';
import { MockTransactionRepository } from '@/features/shared/data/repositories/mock-transaction-repository';
import { TransactionService } from '@/features/shared/data/services/transaction-service';

const dashboardRepository = new MockDashboardRepository();
const transactionRepository = new MockTransactionRepository();

const getDashboardUseCase = new GetDashboardUseCase(dashboardRepository);
const getGreetingUseCase = new GetGreetingUseCase();
const addTransactionUseCase = new AddTransactionUseCase(transactionRepository);

export const dashboardService = new DashboardService(
  getDashboardUseCase,
  getGreetingUseCase
);
export const transactionService = new TransactionService(
  addTransactionUseCase,
  transactionRepository
);
export const insightsService = new InsightsService();
export const profileService = new ProfileService();
export const accountsService = new AccountsService();
