export const HeaderTabs: [string, string][] = [
  ["owner", "For Owner"],
  ["buyer", "For Buyer"],
  ["tenant", "For Tenant"],
  ["shopper", "For Shopper"],
  ["dealer", "For Dealer"],
  ["client", "For client"],
];

export const SearchBoxTabs: [string, React.ReactNode?][] = [
  ["Room", "Room"],
  ["Flat", "Flat"],
  ["Hostel", "Hostel"],
  ["Restaurant", "Restaurant"],
  ["Land", "Land"],
  ["Book", "Book"],
  ["Car", "Car"],
];

export const BottomTabs: [string, React.ReactNode][] = [
  [
    "",
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-house"
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>,
  ],
  [
    "search",
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-search"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>,
  ],
  [
    "profile",
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-user-round"
    >
      <path d="M18 20a6 6 0 0 0-12 0" />
      <circle cx="12" cy="10" r="4" />
      <circle cx="12" cy="12" r="10" />
    </svg>,
  ],
];
