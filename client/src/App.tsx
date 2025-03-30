import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TruthOrDare from "@/pages/TruthOrDare";
import BuildADate from "@/pages/BuildADate";
import Navbar from "@/components/Navbar";
import HeartBackground from "@/components/HeartBackground";
import Footer from "@/components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/truth-or-dare" component={TruthOrDare} />
      <Route path="/build-a-date" component={BuildADate} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-neutral dark:bg-dark dark:text-white transition-colors duration-300">
        <HeartBackground />
        <Navbar />
        <div className="flex-grow">
          <Router />
        </div>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
