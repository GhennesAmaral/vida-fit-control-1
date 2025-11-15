"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, Bell, Moon, Sun, Globe, Lock, User, 
  Mail, Smartphone, Shield, ChevronRight, ArrowLeft,
  Check, X
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    habits: true,
    weekly: true,
    motivation: true,
    achievements: false
  });

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('pt-BR');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/app">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900">Configurações</h1>
                <p className="text-xs text-gray-500">Personalize sua experiência</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Configurações salvas com sucesso!</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Perfil */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-900">Perfil</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full"
                />
              </div>

              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
              >
                Salvar Alterações
              </Button>
            </div>
          </Card>

          {/* Notificações */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-900">Notificações</h2>
            </div>

            <div className="space-y-4">
              <SettingItem
                label="Lembretes de hábitos"
                description="Receba lembretes para registrar seus hábitos diários"
                checked={notifications.habits}
                onChange={(checked) => setNotifications({ ...notifications, habits: checked })}
              />

              <SettingItem
                label="Relatórios semanais"
                description="Receba seu resumo semanal toda sexta-feira"
                checked={notifications.weekly}
                onChange={(checked) => setNotifications({ ...notifications, weekly: checked })}
              />

              <SettingItem
                label="Mensagens motivacionais"
                description="Receba frases inspiradoras ao longo do dia"
                checked={notifications.motivation}
                onChange={(checked) => setNotifications({ ...notifications, motivation: checked })}
              />

              <SettingItem
                label="Conquistas desbloqueadas"
                description="Seja notificado quando ganhar novas conquistas"
                checked={notifications.achievements}
                onChange={(checked) => setNotifications({ ...notifications, achievements: checked })}
              />
            </div>
          </Card>

          {/* Aparência */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              {darkMode ? (
                <Moon className="w-6 h-6 text-teal-600" />
              ) : (
                <Sun className="w-6 h-6 text-teal-600" />
              )}
              <h2 className="text-xl font-bold text-gray-900">Aparência</h2>
            </div>

            <div className="space-y-4">
              <SettingItem
                label="Modo escuro"
                description="Ative o tema escuro para reduzir o cansaço visual"
                checked={darkMode}
                onChange={setDarkMode}
              />

              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Idioma
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Privacidade e Segurança */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-900">Privacidade e Segurança</h2>
            </div>

            <div className="space-y-3">
              <SettingButton
                icon={Lock}
                label="Alterar senha"
                description="Atualize sua senha de acesso"
              />

              <SettingButton
                icon={Smartphone}
                label="Dispositivos conectados"
                description="Gerencie os dispositivos com acesso à sua conta"
              />

              <SettingButton
                icon={Shield}
                label="Autenticação em duas etapas"
                description="Adicione uma camada extra de segurança"
              />
            </div>
          </Card>

          {/* Dados e Privacidade */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-900">Dados e Privacidade</h2>
            </div>

            <div className="space-y-3">
              <SettingButton
                icon={Mail}
                label="Exportar meus dados"
                description="Baixe uma cópia de todos os seus dados"
              />

              <SettingButton
                icon={X}
                label="Excluir minha conta"
                description="Remova permanentemente sua conta e dados"
                danger
              />
            </div>
          </Card>

          {/* Sobre */}
          <Card className="p-6">
            <div className="space-y-3 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mx-auto">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">VivaFit Control</h3>
              <p className="text-sm text-gray-600">Versão 1.0.0</p>
              <div className="flex justify-center gap-4 pt-4">
                <a href="#" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                  Termos de Uso
                </a>
                <span className="text-gray-300">•</span>
                <a href="#" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                  Política de Privacidade
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Components
function SettingItem({ label, description, checked, onChange }: any) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex-1">
        <div className="font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-600 mt-1">{description}</div>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="ml-4"
      />
    </div>
  );
}

function SettingButton({ icon: Icon, label, description, danger }: any) {
  return (
    <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors text-left">
      <div className="flex items-center gap-3 flex-1">
        <Icon className={`w-5 h-5 ${danger ? 'text-red-600' : 'text-gray-600'}`} />
        <div>
          <div className={`font-medium ${danger ? 'text-red-600' : 'text-gray-900'}`}>
            {label}
          </div>
          <div className="text-sm text-gray-600 mt-1">{description}</div>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
}
