import { MockDashboardRepository } from '@/data/repositories/mock-dashboard-repository';
import { MockTransactionRepository } from '@/data/repositories/mock-transaction-repository';
import { DashboardService } from '@/data/services/dashboard-service';
import { TransactionService } from '@/data/services/transaction-service';
import { AddTransactionUseCase } from '@/domain/usecases/add-transaction-use-case';
import { GetDashboardUseCase } from '@/domain/usecases/get-dashboard-use-case';
import { GetGreetingUseCase } from '@/domain/usecases/get-greeting-use-case';

const dashboardRepository = new MockDashboardRepository();
const transactionRepository = new MockTransactionRepository();

const getDashboardUseCase = new GetDashboardUseCase(dashboardRepository);
const getGreetingUseCase = new GetGreetingUseCase();
const addTransactionUseCase = new AddTransactionUseCase(transactionRepository);

export const dashboardService = new DashboardService(
  getDashboardUseCase,
  getGreetingUseCase
);
export const transactionService = new TransactionService(addTransactionUseCase);
