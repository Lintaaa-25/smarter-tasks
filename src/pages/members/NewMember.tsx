import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { addMember } from '../../context/members/actions';
import { useMembersDispatch } from "../../context/members/context";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const NewMember = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatchMembers = useMembersDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const closeModal = () => {
    setIsOpen(false);
    setError(null);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await addMember(dispatchMembers, data);
    if (response.ok) {
      closeModal();
    } else {
      setError(response.error || "Something went wrong.");
    }
  };

  return (
    <>
      <button
        id="new-member-btn"
        type="button"
        onClick={openModal}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
      >
        New Member
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Create new member
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <input
                      id="name"
                      {...register('name', { required: true })}
                      placeholder="Name"
                      className="w-full border rounded-md py-2 px-3 mt-4"
                    />
                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

                    <input
                      id="email"
                      type="email"
                      {...register('email', { required: true })}
                      placeholder="Email"
                      className="w-full border rounded-md py-2 px-3 mt-2"
                    />
                    {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

                    <input
                      id="password"
                      type="password"
                      {...register('password', { required: true })}
                      placeholder="Password"
                      className="w-full border rounded-md py-2 px-3 mt-2"
                    />
                    {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        id="create-member-btn"
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-200 px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewMember;
