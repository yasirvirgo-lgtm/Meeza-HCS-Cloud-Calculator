
export enum ServiceCategory {
  COMPUTE = 'Elastic Cloud Server / Virtual Machines',
  STORAGE = 'Storage Services',
  DR = 'DR Services',
  CONTAINERS = 'Container Services (CCE)',
  SECURITY = 'Security and Protection Services',
  DATABASE = 'Database as a Service',
  NETWORK = 'Network Services',
  FREE = 'Value Added (Free Services)'
}

export interface CloudService {
  id: string;
  name: string;
  category: ServiceCategory;
  unit: string;
  unitPrice: number;
  description: string;
}

export interface SelectionItem {
  serviceId: string;
  quantity: number;
  months: number;
}
