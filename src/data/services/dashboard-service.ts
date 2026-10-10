import { financeStore } from '@/data/datasources/finance-store';
import type { DashboardSnapshot, YearMonth } from '@/domain/entities/dashboard-snapshot';
import type { GetDashboardUseCase } from '@/domain/usecases/get-dashboard-use-case';
import type { GetGreetingUseCase } from '@/domain/usecases/get-greeting-use-case';

/** Application-facing API for dashboard reads and store observation. */
export class DashboardService {
  constructor(
    private readonly getDashboardUseCase: GetDashboardUseCase,
    private readonly getGreetingUseCase: GetGreetingUseCase
  ) {}

  getDashboardSync(yearMonth: YearMonth): DashboardSnapshot {
    return this.getDashboardUseCase.executeSync(yearMonth);
  }

  getGreeting(userName: string, referenceDate: Date): string {
    return this.getGreetingUseCase.execute(userName, referenceDate);
  }

  subscribe(listener: () => void): () => void {
    return financeStore.subscribe(listener);
  }

  getVersion(): number {
    return financeStore.getVersion();
  }
}
