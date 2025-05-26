import React from 'react';

const StrategyGuidesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Strategy Guides</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-2">
            <h3 className="text-lg font-semibold">Beginner's Guide to Trading</h3>
            <p className="text-sm text-muted-foreground">Learn the basics of trading cryptocurrencies.</p>
            <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              Read Guide
            </button>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-2">
            <h3 className="text-lg font-semibold">Technical Analysis Fundamentals</h3>
            <p className="text-sm text-muted-foreground">Master the art of reading charts and indicators.</p>
            <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              Read Guide
            </button>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-2">
            <h3 className="text-lg font-semibold">Risk Management Strategies</h3>
            <p className="text-sm text-muted-foreground">Learn how to protect your capital while trading.</p>
            <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              Read Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyGuidesPage;
