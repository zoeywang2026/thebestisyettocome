/**
 * App Router
 * Design: Modern Lifestyle Magazine — cupcakesandcashmere.com clone
 * Routes:
 *   /              → Blog listing (Home)
 *   /blog/:slug    → Blog post detail
 *   /gallery       → Photo gallery
 *   /category/:cat → Category listing
 *   /search        → Search results
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Gallery from "./pages/Gallery";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/category/:category" component={CategoryPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
