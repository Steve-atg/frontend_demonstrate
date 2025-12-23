import { transactionsAPI } from '@/api/client';
import TransactionTable from '@/components/user-dashboard/TransactionTable';
import FilterTransactionsForm from '@/components/user-dashboard/FilterTransactionsForm';
import { TransactionResponseDto } from '@/api/generated/data-contracts';
import { Alert } from 'antd';
import { Suspense } from 'react';
import TransactionModalForm from '@/components/user-dashboard/TransactionModalForm';
import { nanoid } from '@ant-design/pro-components';

interface FilterTransactionsFormValues {
  search?: string;
  description?: string;
  type?: 'SPEND' | 'INCOME';
  currency?: string;
  minAmount?: number;
  maxAmount?: number;
  transactionDateAfter?: string;
  transactionDateBefore?: string;
  createdAfter?: string;
  createdBefore?: string;
  sortBy?: 'transactionDate' | 'amount' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

interface UserDashboardPageProps {
  searchParams: {
    search?: string;
    description?: string;
    type?: 'SPEND' | 'INCOME';
    currency?: string;
    minAmount?: string;
    maxAmount?: string;
    transactionDateAfter?: string;
    transactionDateBefore?: string;
    createdAfter?: string;
    createdBefore?: string;
    sortBy?: 'transactionDate' | 'amount' | 'createdAt' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
    page?: string;
    limit?: string;
    id?: string;
  };
}

// Loading component for Suspense
function LoadingComponent() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
        <p className='mt-4 text-gray-600 font-medium'>
          Loading transactions...
        </p>
        <p className='mt-2 text-gray-500 text-sm'>
          Gathering transaction data...
        </p>
      </div>
    </div>
  );
}

// Error component
function ErrorComponent({
  error,
  filterInitialValues,
}: {
  error: string;
  filterInitialValues: FilterTransactionsFormValues;
}) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6'>
      <div className='max-w-4xl mx-auto pt-20'>
        <Alert
          message='Error Loading Transactions'
          description={error}
          type='error'
          showIcon
          className='mb-6 rounded-2xl border-0 shadow-lg'
        />
        <FilterTransactionsForm initialValues={filterInitialValues} />
      </div>
    </div>
  );
}

async function UserDashboardPage({ searchParams }: UserDashboardPageProps) {
  // Extract filter-related search params from server-side searchParams
  const search = searchParams.search || undefined;
  const description = searchParams.description || undefined;
  const type = searchParams.type;
  const currency = searchParams.currency || undefined;
  const minAmount = searchParams.minAmount
    ? Number(searchParams.minAmount)
    : undefined;
  const maxAmount = searchParams.maxAmount
    ? Number(searchParams.maxAmount)
    : undefined;
  const transactionDateAfter = searchParams.transactionDateAfter || undefined;
  const transactionDateBefore = searchParams.transactionDateBefore || undefined;
  const createdAfter = searchParams.createdAfter || undefined;
  const createdBefore = searchParams.createdBefore || undefined;
  const sortBy = searchParams.sortBy;
  const sortOrder = searchParams.sortOrder;
  const page = searchParams.page ? Number(searchParams.page) : undefined;
  const limit = searchParams.limit ? Number(searchParams.limit) : undefined;
  const id = searchParams.id || undefined;

  // Create filter initial values object
  const filterInitialValues = {
    search,
    description,
    type,
    currency,
    minAmount,
    maxAmount,
    transactionDateAfter,
    transactionDateBefore,
    createdAfter,
    createdBefore,
    sortBy,
    sortOrder,
  };

  // Server-side data fetching
  let transactionData: TransactionResponseDto[] = [];
  let error: string | null = null;
  let formData: TransactionResponseDto | undefined = undefined;

  try {
    const transactionsResp =
      await transactionsAPI.transactionsControllerGetMyTransactions({
        search,
        description,
        type,
        currency,
        minAmount,
        maxAmount,
        transactionDateAfter,
        transactionDateBefore,
        createdAfter,
        createdBefore,
        sortBy,
        sortOrder,
        page,
        limit,
      });
    transactionData = transactionsResp.data.data || [];

    const transactionResp = id
      ? await transactionsAPI.transactionsControllerFindOne(id)
      : null;
    formData = transactionResp?.data;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load transactions';
    console.error('Error fetching transactions:', err);
  }

  if (error) {
    return (
      <ErrorComponent error={error} filterInitialValues={filterInitialValues} />
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-blue-600/10 rounded-full blur-3xl'></div>
      </div>

      <div className='relative z-10'>
        <TransactionModalForm key={id ?? nanoid()} formData={formData} />
        <FilterTransactionsForm initialValues={filterInitialValues} />
        <TransactionTable tableData={transactionData} />
      </div>
    </div>
  );
}

// Wrap the component with Suspense to handle loading states
export default function UserDashboardPageWithSuspense(
  props: UserDashboardPageProps
) {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <UserDashboardPage {...props} />
    </Suspense>
  );
}
