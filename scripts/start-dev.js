const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 启动微前端开发环境...\n');

// 启动顺序很重要：先启动提供者，再启动消费者
const apps = [
    { name: 'mf_app1 (Provider)', path: 'packages/mf_app1', port: 3001, delay: 0 },
    { name: 'mf_app2 (Consumer)', path: 'packages/mf_app2', port: 3002, delay: 3000 },
    { name: 'mf_app3 (Hybrid)', path: 'packages/mf_app3', port: 3003, delay: 5000 }
];

function startApp(app) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`📦 启动 ${app.name} (端口 ${app.port})...`);

            const child = spawn('pnpm', ['dev'], {
                cwd: path.join(process.cwd(), app.path),
                stdio: 'inherit',
                shell: true
            });

            child.on('error', (error) => {
                console.error(`❌ ${app.name} 启动失败:`, error);
            });

            resolve(child);
        }, app.delay);
    });
}

async function startAll() {
    // 首先构建共享库
    console.log('🔧 构建共享库...');
    const buildShared = spawn('pnpm', ['build'], {
        cwd: path.join(process.cwd(), 'shared'),
        stdio: 'inherit',
        shell: true
    });

    buildShared.on('close', async (code) => {
        if (code === 0) {
            console.log('✅ 共享库构建完成\n');

            // 按顺序启动应用
            for (const app of apps) {
                await startApp(app);
            }

            console.log('\n🎉 所有应用已启动！');
            console.log('📱 访问地址:');
            console.log('  - mf_app1 (Provider): http://localhost:3001');
            console.log('  - mf_app2 (Consumer): http://localhost:3002');
            console.log('  - mf_app3 (Hybrid): http://localhost:3003');
        } else {
            console.error('❌ 共享库构建失败');
            process.exit(1);
        }
    });
}

// 处理退出信号
process.on('SIGINT', () => {
    console.log('\n👋 正在关闭所有应用...');
    process.exit(0);
});

startAll();