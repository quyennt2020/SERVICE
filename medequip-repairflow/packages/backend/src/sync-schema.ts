import { AppDataSource } from './data-source';

async function syncSchema() {
  try {
    console.log('Initializing data source...');
    await AppDataSource.initialize();
    console.log('Data source initialized.');

    console.log('Synchronizing schema...');
    await AppDataSource.synchronize();
    console.log('Schema synchronized.');

    await AppDataSource.destroy();
    console.log('Data source connection closed.');
  } catch (error) {
    console.error('Error during schema synchronization:', error);
    process.exit(1);
  }
}

syncSchema();
