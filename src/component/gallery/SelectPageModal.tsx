'use client';
import { Fragment, useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

import { Transition, Dialog } from '@headlessui/react';
import { useGallery } from '@/context/useGallery';

export function SelectPageModal() {
  const { search, totalPage, filter } = useGallery();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputPage, setInputPage] = useState<number>(filter.page);

  const page = totalPage == 0 ? 0 : filter.page;

  const handleClose = () => {
    setInputPage(page);
    setIsOpen(false);
  };
  const handleOpen = () => setIsOpen(true);
  const handlePlus = () => setInputPage(inputPage + 1);
  const handleMinus = () => setInputPage(inputPage - 1);
  const handleGoToPage = () => {
    search({ ...filter, page: inputPage });
    handleClose();
  };

  return (
    <>
      <span
        className="inline-flex items-center justify-center px-2 py-3 text-sm text-zinc-100 select-none cursor-pointer w-full max-w-[10rem] min-w-[4rem]"
        onClick={handleOpen}>
        {page} / {totalPage}
      </span>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={handleClose}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-lucide-800/70" />
            </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden="true"></span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-lucide-600 shadow-xl rounded-2xl">
                <Dialog.Title as="div" className="text-zinc-100 flex items-center justify-between">
                  <span className="text-xl font-medium leading-6"> Page Selector</span>
                  <X onClick={handleClose} className="cursor-pointer" />
                </Dialog.Title>
                <div className="mt-4 text-sm p-4">
                  <p>
                    You are on page {page} / {totalPage}
                  </p>
                  <p>There is 25 images in this category and a maximum of 25 images per page.</p>
                  <div className="mt-6 m-auto flex gap-2 items-center w-60">
                    <button
                      className="rounded-md bg-white text-lucide-800 p-2 cursor-pointer hover:bg-gray-500 disabled:bg-gray-500"
                      onClick={handleMinus}
                      disabled={inputPage === 1}>
                      <Minus size={20} />
                    </button>
                    <input
                      type="number"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full bg-lucide-600 border-white border-2 rounded-md text-center text-zinc-100 p-2 select-none"
                      value={inputPage}
                      onChange={(e) => setInputPage(parseInt(e.target.value))}
                      readOnly
                    />
                    <button
                      className="rounded-md bg-white text-lucide-800 p-2 cursor-pointer hover:bg-gray-500 disabled:bg-gray-500"
                      onClick={handlePlus}
                      disabled={inputPage === totalPage}>
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-row-reverse gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-zinc-100 bg-violet-400 border border-transparent rounded-md hover:bg-violet-500 duration-300"
                    onClick={handleGoToPage}>
                    Go To Page
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-zinc-100 bg-gray-500 border border-transparent rounded-md hover:bg-gray-600 duration-300"
                    onClick={handleClose}>
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
