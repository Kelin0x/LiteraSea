"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { getNFTContract, getMarketplaceContract } from '../../utils/contract'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [account, setAccount] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [chainId, setChainId] = useState<string>("")
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)

  // 自动连接钱包
  const autoConnectWallet = async () => {
    if (typeof window.ethereum === "undefined") return;
    
    try {
      // 使用eth_accounts而不是eth_requestAccounts，这样不会弹出MetaMask窗口
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

  // 组件加载时自动连接
  useEffect(() => {
    autoConnectWallet();
    
    // 设置事件监听器
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

    // 清理函数
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  // 替换原来的 ConnectButton 部分
  const WalletButton = () => (
    <button
      onClick={autoConnectWallet}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isConnected ? `${account.slice(0, 6)}...${account.slice(-4)}` : "连接钱包"}
    </button>
  )

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* 左侧菜单 */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* 中间导航链接 */}
          <div className="flex items-center space-x-8">
            <Link
              href="/marketplace"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Marketplace
            </Link>
            <Link
              href="/mynft"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              My NFT
            </Link>
          </div>

          {/* 右侧连接钱包按钮 - 替换原来的 ConnectButton */}
          <div className="flex items-center">
            <WalletButton />
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/marketplace"
                className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
              >
                Marketplace
              </Link>
              <Link
                href="/mynft"
                className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
              >
                My NFT
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// 主页面组件
const BookPage = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 将fetchNFTs提升到父组件
  const fetchNFTs = async () => {
    if (!window.ethereum) {
      setError("请先安装 MetaMask");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const nftContract = getNFTContract(signer);
      const address = await signer.getAddress();

      const balance = await nftContract.balanceOf(address);
      console.log('NFT余额:', balance.toString());

      const totalNFTs = [];

      for (let i = 0; i < Number(balance); i++) {
        try {
          const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
          console.log('获取到tokenId:', tokenId.toString());

          const tokenURI = await nftContract.tokenURI(tokenId);
          console.log('获取到tokenURI:', tokenURI);

          let metadata;
          try {
            const response = await fetch(tokenURI);
            metadata = await response.json();
          } catch (error) {
            console.error('获取元数据失败:', error);
            metadata = {
              name: `NFT #${tokenId}`,
              description: '无法加载元数据',
              image: 'https://placehold.co/400x400'
            };
          }

          totalNFTs.push({
            tokenId: tokenId.toString(),
            name: metadata.name || `NFT #${tokenId}`,
            description: metadata.description || '',
            image: metadata.image || 'https://placehold.co/400x400'
          });
        } catch (error) {
          console.error(`获取NFT ${i}的信息失败:`, error);
        }
      }

      setNfts(totalNFTs);
    } catch (error) {
      console.error("获取NFT列表失败:", error);
      setError("获取NFT列表失败: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // 在组件挂载时获取NFT列表
  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8">
        <MintNFT onMintSuccess={fetchNFTs} />
        <div className="my-8">
          <hr className="border-gray-300" />
        </div>
        <NFTGallery nfts={nfts} loading={loading} error={error} onRefresh={fetchNFTs} />
      </main>
    </div>
  );
};

// 修改MintNFT组件，接收onMintSuccess回调
const MintNFT = ({ onMintSuccess }: { onMintSuccess: () => Promise<void> }) => {
  const [tokenURI, setTokenURI] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });
  const [submitType, setSubmitType] = useState<'direct' | 'form'>('direct');

  const handleFormSubmit = () => {
    // 构建元数据JSON
    const metadata = {
      name: formData.name,
      description: formData.description,
      image: formData.image
    };
    // 将元数据转换为JSON字符串
    setTokenURI(JSON.stringify(metadata));
  };

  const mintNFT = async () => {
    if (!tokenURI) {
      alert('请先输入或生成Token URI');
      return;
    }
    
    console.log('开始铸造NFT...');
    console.log('TokenURI:', tokenURI);
    
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      const nftContract = getNFTContract(signer);
      
      console.log('发送铸造交易...');
      const tx = await nftContract.safeMint(signerAddress, tokenURI);
      console.log('交易hash:', tx.hash);
      
      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log: any) => log.eventName === 'Transfer'
      );
      
      if (event) {
        console.log('新铸造的NFT tokenId:', event.args[2].toString());
        alert('NFT铸造成功！');
        setTokenURI('');
        setFormData({
          name: '',
          description: '',
          image: ''
        });
        
        // 调用父组件传入的刷新函数
        await onMintSuccess();
      }
    } catch (error: any) {
      console.error('铸造失败:', error);
      alert('铸造失败: ' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">铸造新的NFT</h2>
      
      {/* 切换按钮 */}
      <div className="flex mb-4 space-x-4">
        <button
          onClick={() => setSubmitType('direct')}
          className={`px-4 py-2 rounded ${
            submitType === 'direct' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200'
          }`}
        >
          直接输入
        </button>
        <button
          onClick={() => setSubmitType('form')}
          className={`px-4 py-2 rounded ${
            submitType === 'form' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200'
          }`}
        >
          表单填写
        </button>
      </div>

      {submitType === 'direct' ? (
        // 直接输入模式
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Token URI (IPFS或其他元数据URL)
          </label>
          <input
            type="text"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="https://gateway.pinata.cloud/ipfs/YOUR_IPFS_HASH"
          />
          <p className="text-sm text-gray-500 mt-1">
          </p>
        </div>
      ) : (
        // 表单填写模式
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">NFT名称</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="输入NFT名称"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="输入NFT描述"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">图片URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="输入图片URL (IPFS或其他链接)"
            />
          </div>
          <button
            onClick={handleFormSubmit}
            className="w-full p-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded"
          >
            生成元数据
          </button>
        </div>
      )}

      {/* 预览区域 */}
      {tokenURI && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <h3 className="font-medium mb-2">当前元数据预览：</h3>
          <pre className="whitespace-pre-wrap break-words">
            {tokenURI}
          </pre>
        </div>
      )}

      <button
        onClick={mintNFT}
        disabled={loading || !tokenURI}
        className={`w-full p-2 rounded ${
          loading || !tokenURI 
            ? 'bg-gray-400' 
            : 'bg-blue-500 hover:bg-blue-700'
        } text-white font-bold`}
      >
        {loading ? '铸造中...' : '铸造NFT'}
      </button>
    </div>
  );
};

// 修改NFTGallery组件，接收props
const NFTGallery = ({ 
  nfts, 
  loading, 
  error, 
  onRefresh 
}: { 
  nfts: any[], 
  loading: boolean, 
  error: string | null,
  onRefresh: () => Promise<void>
}) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">我的NFT收藏</h2>
        <button
          onClick={onRefresh}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          刷新
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">加载中...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">
          {error}
        </div>
      ) : nfts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <div key={nft.tokenId} className="border rounded-lg p-4 shadow-md">
              <img 
                src={nft.image} 
                alt={nft.name}
                className="w-full h-48 object-cover rounded-md mb-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.dataset.errorHandled) {
                    target.dataset.errorHandled = 'true';
                    target.src = 'https://placehold.co/400x400';
                  }
                }}
              />
              <h3 className="text-lg font-semibold">{nft.name}</h3>
              {nft.description && (
                <p className="text-gray-600 text-sm">{nft.description}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">Token ID: {nft.tokenId}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          还没有NFT，快去铸造一个吧！
        </div>
      )}
    </div>
  );
};

export default BookPage;

