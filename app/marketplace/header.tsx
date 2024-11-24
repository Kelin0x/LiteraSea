"use client"

import { Search, ChevronDown } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'

export function Header() {
    // 添加钱包相关状态
    const [account, setAccount] = useState("")
    const [isConnected, setIsConnected] = useState(false)
    const [chainId, setChainId] = useState<string>("")
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // 自动连接钱包
    const autoConnectWallet = async () => {
        if (typeof window.ethereum === "undefined") return;
        
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            
            if (accounts.length > 0) {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                const isCorrectNetwork = chainId === '0x7A69';
                
                setAccount(accounts[0]);
                setChainId(chainId);
                setIsConnected(true);
                setIsCorrectNetwork(isCorrectNetwork);

                if (!isCorrectNetwork) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x7A69' }],
                        });
                    } catch (error) {
                        console.error('切换网络失败:', error);
                    }
                }
            }
        } catch (error) {
            console.error("自动连接失败:", error);
        }
    };

    // 添加滚动监听
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 组件加载时自动连接
    useEffect(() => {
        autoConnectWallet();
        
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
                if (newAccounts.length === 0) {
                    setAccount("");
                    setIsConnected(false);
                } else {
                    setAccount(newAccounts[0]);
                    setIsConnected(true);
                }
            });

            window.ethereum.on('chainChanged', (newChainId: string) => {
                setChainId(newChainId);
                setIsCorrectNetwork(newChainId === '0x7A69');
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', () => {});
                window.ethereum.removeListener('chainChanged', () => {});
            }
        };
    }, []);

    return (
        <header className={`
            border-b bg-white/80 backdrop-blur-md sticky top-0 z-50
            ${isScrolled ? 'shadow-lg' : ''}
        `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-3xl font-bold text-indigo-600">
                            LiteraSea
                        </a>
                    </div>

                    {/* 导航链接 */}
                    <nav className="flex items-center space-x-8 ml-12">
                        <a href="/" className="text-indigo-600 font-medium relative group">
                            Home
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
                        </a>
                        <a href="/mynft" className="text-gray-600 hover:text-indigo-600 font-medium relative group">
                            NFT
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                        </a>
                        <a href="/books" className="text-gray-600 hover:text-indigo-600 font-medium relative group inline-flex items-center">
                            Explore Books
                            <ChevronDown className="ml-1 h-4 w-4" />
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                        </a>
                        <a href="/create" className="text-gray-600 hover:text-indigo-600 font-medium relative group">
                            Create
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                        </a>
                    </nav>

                    {/* 搜索框和操作按钮 */}
                    <div className="flex items-center space-x-6">
                        <div className="relative w-48">
                            <Input
                                className="w-full pl-4 pr-10 h-10 rounded-xl border-indigo-100 focus:border-indigo-300 focus:ring-indigo-200"
                                placeholder="Search..."
                                type="search"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <Search className="h-4 w-4 text-indigo-400" />
                            </div>
                        </div>
                        <Button variant="ghost" className="relative hover:bg-indigo-50">
                            <span className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-indigo-600 text-white rounded-full flex items-center justify-center">
                                0
                            </span>
                            ♥
                        </Button>
                        <Button variant="ghost" className="hover:bg-indigo-50">EN</Button>
                        
                        {/* 钱包连接按钮 */}
                        <Button
                            onClick={autoConnectWallet}
                            className={`
                                relative overflow-hidden group
                                px-6 py-2.5 rounded-xl
                                bg-gradient-to-r from-indigo-600 to-violet-600
                                hover:from-indigo-500 hover:to-violet-500
                                text-white font-medium
                                transform transition-all duration-300
                                hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]
                            `}
                        >
                            <span className="relative z-10 flex items-center">
                                {isConnected ? (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                                        {`${account.slice(0, 6)}...${account.slice(-4)}`}
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        连接钱包
                                    </>
                                )}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

