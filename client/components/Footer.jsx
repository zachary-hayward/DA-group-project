import React from 'react'

function Footer() {
  return (
    <>
      <footer class="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100">
        <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
            <img src="images/icons/icon-black-4.png" class="mr-5 h-6 sm:h-9" alt="logo" />
              <p class="max-w-xs mt-4 text-sm text-gray-600">
                Social media by Jean-Pierre.
              </p>
            </div>
            <div class="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p class="font-medium">
                  Company
                </p>
                <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <a class="hover:opacity-75" href> About </a>
                  <a class="hover:opacity-75" href> Meet the Team </a>
                  <a class="hover:opacity-75" href> History </a>
                  <a class="hover:opacity-75" href> Careers </a>
                </nav>
              </div>
              <div>
                <p class="font-medium">
                  Services
                </p>
                <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <a class="hover:opacity-75" href> 1on1 Coaching </a>
                  <a class="hover:opacity-75" href> Company Review </a>
                  <a class="hover:opacity-75" href> Accounts Review </a>
                  <a class="hover:opacity-75" href> HR Consulting </a>
                  <a class="hover:opacity-75" href> SEO Optimisation </a>
                </nav>
              </div>
              <div>
                <p class="font-medium">
                  Helpful Links
                </p>
                <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <a class="hover:opacity-75" href> Contact </a>
                  <a class="hover:opacity-75" href> FAQs </a>
                  <a class="hover:opacity-75" href> Live Chat </a>
                </nav>
              </div>
              <div>
                <p class="font-medium">
                  Legal
                </p>
                <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <a class="hover:opacity-75" href> Privacy Policy </a>
                  <a class="hover:opacity-75" href> Terms &amp; Conditions </a>
                  <a class="hover:opacity-75" href> Returns Policy </a>
                  <a class="hover:opacity-75" href> Accessibility </a>
                </nav>
              </div>
            </div>
          </div>
          <p class="mt-8 text-xs text-gray-800">
            © Pikopiko 2022 | Kes-Ke-Say Limited
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer