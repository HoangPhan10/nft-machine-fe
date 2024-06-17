export function getTimeDifference(pastDateString: string): string {
  // Get the current time
  const currentTime: Date = new Date();

  // Define the past date
  const pastTime: Date = new Date(pastDateString);

  // Calculate the difference in milliseconds
  const timeDifference: number = currentTime.getTime() - pastTime.getTime();

  // Convert the difference to a more readable format
  let seconds: number = Math.floor(timeDifference / 1000);
  let minutes: number = Math.floor(seconds / 60);
  let hours: number = Math.floor(minutes / 60);
  let days: number = Math.floor(hours / 24);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  // Return the result as a string
  return `${days}d ${hours}h ${minutes}m`;
}

import { ethers } from "ethers";

export async function getConnectedAccountMetadata() {
  // Kiểm tra xem window.ethereum có sẵn không (Metamask hoặc tương tự)
  if (window.ethereum) {
    try {
      // Yêu cầu quyền truy cập vào tài khoản Ethereum của người dùng
      const accounts:any = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        // Tạo một Web3Provider từ window.ethereum
        const web3provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );

        // Lấy địa chỉ tài khoản đầu tiên trong danh sách các tài khoản kết nối
        const account = accounts[0];

        // Lấy balance của tài khoản
        const balance = await web3provider.getBalance(account);

        // Lấy network thông tin
        const network = await web3provider.getNetwork();

        // Trả về các thông tin cần thiết
        return {
          account,
          balance: ethers.utils.formatEther(balance), // Chuyển đổi balance sang Ether
          network,
        };
      } else {
        throw new Error("No accounts found");
      }
    } catch (error) {
      console.error("Error accessing accounts:", error);
      throw error;
    }
  } else {
    throw new Error("Ethereum provider not found");
  }
}

