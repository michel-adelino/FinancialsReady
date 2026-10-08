export class GetGreetingUseCase {
  execute(userName: string, date: Date = new Date()): string {
    const hour = date.getHours();
    let period = 'evening';
    if (hour < 12) {
      period = 'morning';
    } else if (hour < 18) {
      period = 'afternoon';
    }
    return `Good ${period}, ${userName}`;
  }
}
