async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with the account:", deployer.address);

    const Contract = await ethers.getContractFactory("Incrementer");
    const contract = await Contract.deploy();

    // ✅ Ethers v6 uses `.wait()` instead of `.deployed()`
    await contract.waitForDeployment();

    console.log("Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
