import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const InvestmentForm = ({ swimmers, onInvestmentSubmit }: any) => {
  const [investments, setInvestments] = useState<Array<{ swimmer: string; position: string; amount: string }>>([]);
  const [currentInvestment, setCurrentInvestment] = useState({
    swimmer: "",
    position: "",
    amount: "",
  });

  const handleInputChange = (field: any, value: any) => {
    setCurrentInvestment((prev) => ({ ...prev, [field]: value }));
  };

  const addInvestment = () => {
    if (currentInvestment.swimmer && currentInvestment.position && currentInvestment.amount) {
      setInvestments((prev) => [...prev, currentInvestment]);
      setCurrentInvestment({ swimmer: "", position: "", amount: "" });
    }
  };

  const submitInvestments = () => {
    onInvestmentSubmit(investments);
    setInvestments([]);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Swimmer Investment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="swimmer">Select Swimmer</Label>
            <Select value={currentInvestment.swimmer} onValueChange={(value) => handleInputChange("swimmer", value)}>
              <SelectTrigger id="swimmer">
                <SelectValue placeholder="Choose a swimmer" />
              </SelectTrigger>
              <SelectContent>
                {swimmers.map((swimmer: any) => (
                  <SelectItem key={swimmer.name} value={swimmer.name}>
                    {swimmer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Predicted Position</Label>
            <Select
              value={currentInvestment.position}
              onValueChange={(value: any) => handleInputChange("position", value)}
            >
              <SelectTrigger id="position">
                <SelectValue placeholder="Predict finishing position" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3].map((pos) => (
                  <SelectItem key={pos} value={pos.toString()}>
                    {pos}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Investment Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={currentInvestment.amount}
              onChange={(e: any) => handleInputChange("amount", e.target.value)}
            />
          </div>

          <Button onClick={addInvestment} className="w-full">
            Add Investment
          </Button>

          {investments.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Current Investments:</h3>
              <ul className="list-disc pl-5">
                {investments.map((inv, index) => (
                  <li key={index}>
                    {inv.swimmer} - Position: {inv.position}, Amount: ${inv.amount}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button onClick={submitInvestments} className="w-full mt-4" variant="secondary">
            Submit All Investments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentForm;
