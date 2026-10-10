import { MockDashboardRepository } from '@/features/dashboard/data/repositories/mock-dashboard-repository';
import { MockTransactionRepository } from '@/features/shared/data/repositories/mock-transaction-repository';
import { DashboardService } from '@/features/dashboard/data/services/dashboard-service';
import { TransactionService } from '@/features/shared/data/services/transaction-service';
import { AddTransactionUseCase } from '@/features/add-transaction/domain/usecases/add-transaction-use-case';
import { GetDashboardUseCase } from '@/features/dashboard/domain/usecases/get-dashboard-use-case';
import { GetGreetingUseCase } from '@/features/dashboard/domain/usecases/get-greeting-use-case';

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
