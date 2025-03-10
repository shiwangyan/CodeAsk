import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModelStore, ModelConfig } from "@/store/useModelStore";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type ModelFormData = Omit<ModelConfig, 'id' | 'enabled'>;

interface ModelConfigDialogProps {
  children: React.ReactNode;
}

export function ModelConfigDialog({ children }: ModelConfigDialogProps) {
  const { register, handleSubmit, reset } = useForm<ModelFormData>({
    defaultValues: {
      baseUrl: "http://localhost:11434/v1",
      temperature: 0.6,
      maxContextTokens: 60000,
      maxOutputTokens: 8000,
      concurrency: 1
    }
  });
  const { addModel } = useModelStore();
  const { t } = useTranslation();

  const onSubmit = (data: ModelFormData) => {
    addModel({ ...data, enabled: true });
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('codeview.model.add')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('codeview.model.name')}</Label>
            <Input id="name" placeholder={t('codeview.model.name')} {...register("name", { required: true })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apiKey">{t('codeview.model.apiKey')}</Label>
            <Input id="apiKey" type="password" placeholder={t('codeview.model.apiKey')} {...register("apiKey", { required: true })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="baseUrl">{t('codeview.model.baseUrl')}</Label>
            <Input id="baseUrl" {...register("baseUrl", { required: true })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="temperature">{t('codeview.model.temperature')}</Label>
            <Input
              id="temperature"
              type="number"
              step="0.1"
              min="0"
              max="2"
              {...register("temperature", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxContextTokens">{t('codeview.model.maxContextTokens')}</Label>
            <Input
              id="maxContextTokens"
              type="number"
              {...register("maxContextTokens", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxOutputTokens">{t('codeview.model.maxOutputTokens')}</Label>
            <Input
              id="maxOutputTokens"
              type="number"
              {...register("maxOutputTokens", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="concurrency">{t('codeview.model.concurrency')}</Label>
            <Input
              id="concurrency"
              type="number"
              min="1"
              {...register("concurrency", {
                required: true,
                valueAsNumber: true,
                min: 1,
              })}
            />
          </div>
          <Button type="submit" className="w-full">{t('codeview.model.save')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 