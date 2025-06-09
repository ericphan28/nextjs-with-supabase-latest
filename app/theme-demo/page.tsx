"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useTheme } from "next-themes";
import { 
  Sun, 
  Moon, 
  Laptop, 
  Star, 
  Heart, 
  Download,
  Settings,
  User,
  Mail,
  Phone
} from "lucide-react";

export default function ThemeDemo() {
  const [inputValue, setInputValue] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Theme Demo Page
            </h1>
            <p className="text-muted-foreground mt-2">
              Test Dark/Light mode switching với các components khác nhau
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Fix hydration mismatch */}
            <Badge variant="outline">
              {mounted ? `Current: ${theme} (${resolvedTheme})` : "Loading theme..."}
            </Badge>
            <ThemeSwitcher />
          </div>
        </div>

        {/* Color Palette Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Color Palette
            </CardTitle>
            <CardDescription>
              CSS Variables được sử dụng trong theme system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-12 bg-background border rounded"></div>
                <p className="text-sm font-mono">background</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-foreground rounded"></div>
                <p className="text-sm font-mono">foreground</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-primary rounded"></div>
                <p className="text-sm font-mono">primary</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-secondary rounded"></div>
                <p className="text-sm font-mono">secondary</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-muted rounded"></div>
                <p className="text-sm font-mono">muted</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-accent rounded"></div>
                <p className="text-sm font-mono">accent</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-destructive rounded"></div>
                <p className="text-sm font-mono">destructive</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-card border rounded"></div>
                <p className="text-sm font-mono">card</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Info Card - Only show when mounted */}
        {mounted && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === 'light' && <Sun className="w-5 h-5 text-yellow-500" />}
                {theme === 'dark' && <Moon className="w-5 h-5 text-blue-400" />}
                {theme === 'system' && <Laptop className="w-5 h-5 text-gray-500" />}
                Current Theme Info
              </CardTitle>
              <CardDescription>
                Real-time theme detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Selected Theme</p>
                  <p className="text-lg font-mono">{theme}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Resolved Theme</p>
                  <p className="text-lg font-mono">{resolvedTheme}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-lg font-mono">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Buttons Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Button Variants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Form Elements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="test">Test Input</Label>
                  <Input 
                    id="test"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type something..."
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-muted-foreground">Form Preview</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Input value: <span className="font-mono">{inputValue || "Empty"}</span>
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Error</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-500" />
                Light Mode
              </CardTitle>
              <CardDescription>
                Bright and clean design
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Light theme sử dụng background trắng với text đen, 
                tạo cảm giác sáng sủa và dễ đọc.
              </p>
              <Button className="w-full mt-4" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-blue-400" />
                Dark Mode
              </CardTitle>
              <CardDescription>
                Easy on the eyes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dark theme giúp giảm căng thẳng mắt, đặc biệt hữu ích 
                khi làm việc trong môi trường ánh sáng yếu.
              </p>
              <Button className="w-full mt-4" variant="default">
                <Heart className="w-4 h-4 mr-2" />
                Favorite
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-gray-500" />
                System
              </CardTitle>
              <CardDescription>
                Follow OS preference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                System theme tự động theo setting của hệ điều hành,
                thay đổi theo thời gian trong ngày.
              </p>
              <Button className="w-full mt-4" variant="secondary">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Demo các elements với icons và styling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">contact@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center p-8 border-t border-border">
          <p className="text-muted-foreground">
            Theme Demo Page - Test switching between Light, Dark, and System themes
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Powered by next-themes + Tailwind CSS + shadcn/ui
          </p>
        </div>

      </div>
    </div>
  );
}