
import { CloudService, ServiceCategory } from './types';

export const INITIAL_SERVICES: CloudService[] = [
  // ECS Section (Updated based on Recommended ECS Configuration image)
  { id: 'ecs-1-1', name: 'ECS 1 vCPU 1 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 20.00, description: 'Basic entry-level instance' },
  { id: 'ecs-1-2', name: 'ECS 1 vCPU 2 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 30.00, description: 'Standard entry-level instance' },
  { id: 'ecs-2-4', name: 'ECS 2 vCPU 4 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 45.00, description: 'General purpose s6.large.2 equivalent' },
  { id: 'ecs-4-4', name: 'ECS 4 vCPU 4 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 60.00, description: 'Compute optimized instance' },
  { id: 'ecs-2-8', name: 'ECS 2 vCPU 8 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 55.00, description: 'Memory optimized entry' },
  { id: 'ecs-4-8', name: 'ECS 4 vCPU 8 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 75.00, description: 'Balanced general purpose' },
  { id: 'ecs-4-16', name: 'ECS 4 vCPU 16 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 95.00, description: 'Standard enterprise flavor' },
  { id: 'ecs-8-16', name: 'ECS 8 vCPU 16 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 130.00, description: 'High performance compute' },
  { id: 'ecs-8-32', name: 'ECS 8 vCPU 32 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 160.00, description: 'Standard memory-heavy workload' },
  { id: 'ecs-16-32', name: 'ECS 16 vCPU 32 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 240.00, description: 'Large scale compute' },
  { id: 'ecs-16-64', name: 'ECS 16 vCPU 64 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 290.00, description: 'Large scale memory-heavy' },
  { id: 'ecs-32-64', name: 'ECS 32 vCPU 64 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 450.00, description: 'Extra-large compute node' },
  { id: 'ecs-32-128', name: 'ECS 32 vCPU 128 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 550.00, description: 'Extra-large memory-heavy' },
  { id: 'ecs-32-256', name: 'ECS 32 vCPU 256 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 750.00, description: 'Ultra memory instance' },
  { id: 'ecs-48-160', name: 'ECS 48 vCPU 160 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 850.00, description: 'Massive compute node' },
  { id: 'ecs-48-192', name: 'ECS 48 vCPU 192 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 920.00, description: 'Premium enterprise compute' },
  { id: 'ecs-64-256', name: 'ECS 64 vCPU 256 Gb RAM', category: ServiceCategory.COMPUTE, unit: 'Monthly', unitPrice: 1200.00, description: 'Flagship compute node' },
  
  // Storage Section
  { id: 'evs-gp-ssd', name: 'EVS General Purpose SSD', category: ServiceCategory.STORAGE, unit: 'GB/Monthly', unitPrice: 0.10, description: 'Block storage for ECS' },
  { id: 'evs-hdd', name: 'EVS HDD', category: ServiceCategory.STORAGE, unit: 'GB/Monthly', unitPrice: 0.05, description: 'Standard high-capacity storage' },
  { id: 'obs-standard', name: 'Object Storage Service (OBS)', category: ServiceCategory.STORAGE, unit: 'GB/Monthly', unitPrice: 0.02, description: 'Scalable cloud object storage' },
  { id: 'backup-vault', name: 'Backup Vault', category: ServiceCategory.STORAGE, unit: 'GB/Monthly', unitPrice: 0.04, description: 'Cloud backup for data protection' },

  // DR Section
  { id: 'csdr-license', name: 'CSDR License', category: ServiceCategory.DR, unit: 'Monthly', unitPrice: 50.00, description: 'Disaster Recovery software license' },
  { id: 'dr-compute', name: 'DR Compute Resources', category: ServiceCategory.DR, unit: 'Monthly', unitPrice: 20.00, description: 'Reserved vCPU/Memory for DR' },

  // Containers Section
  { id: 'cce-cluster', name: 'CCE Cluster Management', category: ServiceCategory.CONTAINERS, unit: 'Monthly', unitPrice: 150.00, description: 'Kubernetes Cluster Control Plane' },
  { id: 'cce-worker-node', name: 'Worker Node (Compute)', category: ServiceCategory.CONTAINERS, unit: 'Monthly', unitPrice: 60.00, description: 'Dedicated resources for CCE workers' },

  // Security Section
  { id: 'hss-standard', name: 'Host Security Service (HSS)', category: ServiceCategory.SECURITY, unit: 'Monthly', unitPrice: 15.00, description: 'Host security protection' },
  { id: 'waf-standard', name: 'Web Application Firewall (WAF)', category: ServiceCategory.SECURITY, unit: 'Monthly', unitPrice: 300.00, description: 'Standard WAF protection' },
  { id: 'edge-fw', name: 'Edge Firewall', category: ServiceCategory.SECURITY, unit: 'Monthly', unitPrice: 200.00, description: 'Network edge protection' },
  { id: 'hsm-kms', name: 'HSM / KMS Encryption', category: ServiceCategory.SECURITY, unit: 'Monthly', unitPrice: 80.00, description: 'Key Management Service' },

  // Database Section
  { id: 'rds-mysql', name: 'RDS for MySQL', category: ServiceCategory.DATABASE, unit: 'Monthly', unitPrice: 110.00, description: 'Managed relational database' },
  { id: 'rds-mongo', name: 'RDS for MongoDB', category: ServiceCategory.DATABASE, unit: 'Monthly', unitPrice: 140.00, description: 'NoSQL document database' },
  { id: 'rds-redis', name: 'Distributed Cache Service (Redis)', category: ServiceCategory.DATABASE, unit: 'Monthly', unitPrice: 40.00, description: 'In-memory data store' },

  // Network Section
  { id: 'eip-standard', name: 'Elastic IP (EIP)', category: ServiceCategory.NETWORK, unit: 'Monthly', unitPrice: 5.00, description: 'Public IP addressing' },
  { id: 'bandwidth-pkg', name: 'Bandwidth Package', category: ServiceCategory.NETWORK, unit: 'Mbps/Monthly', unitPrice: 12.00, description: 'Internet bandwidth resources' },

  // Value Added (Free) Section
  { id: 'elb-free', name: 'Elastic Load Balancer (Basic)', category: ServiceCategory.FREE, unit: 'Free', unitPrice: 0, description: 'Standard Load Balancing' },
  { id: 'vpc-free', name: 'Virtual Private Cloud (VPC)', category: ServiceCategory.FREE, unit: 'Free', unitPrice: 0, description: 'Isolated network environment' },
  { id: 'nat-free', name: 'NAT Gateway (Basic)', category: ServiceCategory.FREE, unit: 'Free', unitPrice: 0, description: 'Internet egress/ingress gateway' }
];
