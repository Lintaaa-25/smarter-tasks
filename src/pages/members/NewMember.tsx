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

                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Name:
                      </label>
                      <input
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        placeholder="Name"
                        className={`w-full border rounded-md py-2 px-3 mt-1 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        Email:
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        placeholder="Email"
                        className={`w-full border rounded-md py-2 px-3 mt-1 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                        Password:
                      </label>
                      <input
                        id="password"
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        placeholder="Password"
                        className={`w-full border rounded-md py-2 px-3 mt-1 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

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
