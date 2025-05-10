'use client';

import { Permission } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  StartPromotion,
  UpdatetPromotion,
  DeletetPromotion,
} from '../../types';
import {
  START_PROMOTION,
  UPDATE_PROMOTION,
  DELETE_PROMOTION,
} from '../../graphQL/promotion';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { useThemeState } from '@/app/providers/reactqueryProvider';
import {
  InputField,
  SelectField,
} from '@/app/components/ReUsable/FormReusableComponent';

const Promote = () => {
  const cachedTheme = useThemeState();

  const { data: session, update } = useSession();
  const number = session?.user.number;
  const permission = session?.user.permission;
  const userId = session?.user.userId as string;
  const promoting = session?.user.promoting as Permission[];

  const [canPromote, setCanPromote] = useState<Permission[]>([]);
  const [activePromotion, setActivePromotion] = useState<Permission[]>([]);
  useEffect(() => {
    setActivePromotion(promoting);
    setCanPromote(
      (permission || []).filter(
        (category) => category !== 'promote' && !promoting?.includes(category)
      )
    );
  }, [session, permission, promoting]);

  const updateNumberOrPromoting = async (
    promote: Permission,
    number?: string
  ) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        number: number,
        promoting: [...promoting, promote],
      },
    });
  };

  const downgradePromoting = async (promote: Permission) => {
    const updatedPromoting = promoting.filter(
      (permission) => permission != promote
    );
    await update({
      ...session,
      user: {
        ...session?.user,
        promoting: updatedPromoting,
      },
    });
  };
  return (
    <main
      className={cn(
        cachedTheme.textColor,
        cachedTheme.borderColor,
        'w-full h-fit grid border-t',
        'grid-cols-3',
        'max-xsm:grid-cols-1 '
      )}
    >
      <ActivePromotions activePromotion={activePromotion} />

      <AddLayout
        userId={userId}
        number={!!number}
        canPromote={canPromote}
        updateNumberAndPromoting={updateNumberOrPromoting}
      />

      <UpdateLayout userId={userId} activePromotion={activePromotion} />

      <RemoveLayout
        userId={userId}
        activePromotion={activePromotion}
        downgradePromoting={downgradePromoting}
      />
    </main>
  );
};

export default Promote;

const ActivePromotions: React.FC<{ activePromotion: Permission[] }> = ({
  activePromotion,
}) => {
  const cachedTheme = useThemeState();

  return (
    <section
      className={cn(
        cachedTheme.bg,
        cachedTheme.borderColor,
        'p-1 flex flex-wrap gap-4 border-b ',
        'col-span-3 ',
        'max-xsm:col-span-1 max-xsm:pb-2 '
      )}
    >
      <span className="text-lg font-semibold">Active Promotions :</span>
      {activePromotion?.map((category) => (
        <span
          key={category}
          className={cn(
            cachedTheme.activeBg,
            cachedTheme.activeTextColor,
            'py-[1px] px-2 rounded-lg cursor-pointer whitespace-nowrap '
          )}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      ))}
    </section>
  );
};

const AddLayout: React.FC<{
  userId: string;
  number: boolean;
  canPromote: Permission[];
  updateNumberAndPromoting: (
    promote: Permission,
    number?: string
  ) => Promise<void>;
}> = ({ number, userId, canPromote, updateNumberAndPromoting }) => {
  const cachedTheme = useThemeState();
  const [startPromotion] = useMutation(START_PROMOTION);

  const {
    reset,
    control,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StartPromotion>();

  const onSubmit: SubmitHandler<StartPromotion> = async (data) => {
    await startPromotion({
      variables: {
        listerId: userId,
        price: data.price,
        number: data.number,
        category: data.promoteCategory,
      },
    });
    await updateNumberAndPromoting(data.promoteCategory, data.number);

    reset();
  };
  return (
    <section
      className={cn(
        cachedTheme.bg,
        cachedTheme.borderColor,
        'w-full border-r border-b',
        'col-span-1 ',
        'max-xsm:pb-4 '
      )}
    >
      <h1
        className={cn(
          cachedTheme.borderColor,
          'font-semibold text-center border-b'
        )}
      >
        Start Promotion
      </h1>

      <form
        className={cn('flex flex-col gap-2 p-1 px-2')}
        onSubmit={handleSubmit(onSubmit)}
      >
        {number && (
          <InputField<StartPromotion, 'number'>
            id="number"
            label="Number"
            errors={errors}
            trigger={trigger}
            register={register}
            rules={{
              required: 'Enter your number',
              pattern: {
                value: /^\d{10}$/,
                message: 'The number must be exactly 10 digits',
              },
            }}
          />
        )}

        <div className="w-full flex gap-2 ">
          <div className="flex-1 ">
            <InputField<StartPromotion, 'price'>
              id="price"
              type="number"
              label="Price/click"
              trigger={trigger}
              register={register}
              rules={{
                valueAsNumber: true,
                required: 'Price Per Click is required',
              }}
              errors={errors}
            />
          </div>

          <SelectField<StartPromotion, 'promoteCategory'>
            errors={errors}
            control={control}
            label="To Promote"
            id="promoteCategory"
            options={canPromote}
            rules={{
              required: 'Required',
            }}
          />
        </div>

        <button
          type="submit"
          className={cn(
            cachedTheme.activeBg,
            cachedTheme.activeTextColor,
            'rounded-lg p-1'
          )}
        >
          Add
        </button>
      </form>
    </section>
  );
};

const UpdateLayout: React.FC<{
  userId: string;
  activePromotion: Permission[];
}> = ({ userId, activePromotion }) => {
  const cachedTheme = useThemeState();
  const [updatePromotion] = useMutation(UPDATE_PROMOTION);

  const {
    reset,
    control,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatetPromotion>();

  const onSubmit: SubmitHandler<UpdatetPromotion> = async (data) => {
    await updatePromotion({
      variables: {
        listerId: userId,
        price: data.price,
        category: data.promoteCategory,
      },
    });

    reset();
  };
  return (
    <section
      className={cn(
        cachedTheme.bg,
        cachedTheme.borderColor,
        'border-r border-b',
        'col-span-1 ',
        'max-xsm:pb-4 '
      )}
    >
      <h1
        className={cn(
          cachedTheme.borderColor,
          'font-semibold text-center border-b'
        )}
      >
        Update Promotion
      </h1>

      <form
        className={cn('flex flex-col gap-2 p-1 px-2')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex gap-2 ">
          <div className="flex-1 ">
            <InputField<UpdatetPromotion, 'price'>
              id="price"
              type="number"
              label="Price/click"
              trigger={trigger}
              register={register}
              rules={{
                valueAsNumber: true,
                required: 'Price Per Click is required',
              }}
              errors={errors}
            />
          </div>

          <SelectField<UpdatetPromotion, 'promoteCategory'>
            errors={errors}
            control={control}
            label="To Update"
            id="promoteCategory"
            options={activePromotion}
            rules={{
              required: 'Required',
            }}
          />
        </div>

        <button
          type="submit"
          className={cn(
            cachedTheme.activeBg,
            cachedTheme.activeTextColor,
            'rounded-lg p-1'
          )}
        >
          Update
        </button>
      </form>
    </section>
  );
};

const RemoveLayout: React.FC<{
  userId: string;
  activePromotion: Permission[];
  downgradePromoting: (promote: Permission) => Promise<void>;
}> = ({ userId, activePromotion, downgradePromoting }) => {
  const cachedTheme = useThemeState();
  const [deletePromotion] = useMutation(DELETE_PROMOTION);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeletetPromotion>();

  const onSubmit: SubmitHandler<DeletetPromotion> = async (data) => {
    await deletePromotion({
      variables: {
        listerId: userId,
        category: data.promoteCategory,
      },
    });
    await downgradePromoting(data.promoteCategory);

    reset();
  };
  return (
    <section
      className={cn(
        cachedTheme.bg,
        cachedTheme.borderColor,
        'border-r border-b',
        'col-span-1 ',
        'max-xsm:mb-2 '
      )}
    >
      <h1
        className={cn(
          cachedTheme.borderColor,
          'font-semibold text-center border-b'
        )}
      >
        Remove Promotion
      </h1>

      <form
        className={cn('flex flex-col gap-2 p-1 px-2')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <SelectField<DeletetPromotion, 'promoteCategory'>
          errors={errors}
          control={control}
          label="To Delete"
          id="promoteCategory"
          options={activePromotion}
          rules={{
            required: 'Required',
          }}
        />

        <button
          type="submit"
          className={cn(
            cachedTheme.activeBg,
            cachedTheme.activeTextColor,
            'rounded-lg p-1'
          )}
        >
          Delete
        </button>
      </form>
    </section>
  );
};
