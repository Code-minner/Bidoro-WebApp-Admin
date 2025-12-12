"use client";

import { useState } from "react";

export default function NotificationTab() {
  const [toggles, setToggles] = useState({
    bidding: false,
    newSeller: true,
    newOrder: true,
    newMessage: true,
    newProduct: true,
    productApproval: true,
    disputeRaised: true,
    wallet: true,
    webNotification: true,
    emailNotification: true,
    smsNotification: true,
    pushNotification: true,
  });

  const toggleSwitch = (key: keyof typeof toggles) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white rounded-xl p-6 w-full">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Notifications
      </h3>

      <div className="space-y-2.5">
        <NotificationRow label="Bidding" active={toggles.bidding} onClick={() => toggleSwitch("bidding")} />
        <NotificationRow label="New seller registration" active={toggles.newSeller} onClick={() => toggleSwitch("newSeller")} />
        <NotificationRow label="New order" active={toggles.newOrder} onClick={() => toggleSwitch("newOrder")} />
        <NotificationRow label="New message" active={toggles.newMessage} onClick={() => toggleSwitch("newMessage")} />
        <NotificationRow label="New product upload" active={toggles.newProduct} onClick={() => toggleSwitch("newProduct")} />
        <NotificationRow label="Product approval/rejection" active={toggles.productApproval} onClick={() => toggleSwitch("productApproval")} />
        <NotificationRow label="Dispute raised" active={toggles.disputeRaised} onClick={() => toggleSwitch("disputeRaised")} />
        <NotificationRow label="Wallet/withdrawal" active={toggles.wallet} onClick={() => toggleSwitch("wallet")} />
      </div>

      {/* Divider now same width as toggle */}
    <div className="my-4 w-full relative pb-2">
  <div className="absolute left-0 right-1/2 border-t"></div>
</div>



      <div className="space-y-2.5">
        <NotificationRow label="Web notification" active={toggles.webNotification} onClick={() => toggleSwitch("webNotification")} />
        <NotificationRow label="Email notification" active={toggles.emailNotification} onClick={() => toggleSwitch("emailNotification")} />
        <NotificationRow label="SMS notification" active={toggles.smsNotification} onClick={() => toggleSwitch("smsNotification")} />
        <NotificationRow label="Push notification" active={toggles.pushNotification} onClick={() => toggleSwitch("pushNotification")} />
      </div>
    </div>
  );
}

function NotificationRow({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center w-full h-8 relative">
      {/* Left Side Label */}
      <span className="text-black text-sm">{label}</span>

      {/* Center Toggle */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <button
          onClick={onClick}
          className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
            active ? "bg-[#15340B]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              active ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
